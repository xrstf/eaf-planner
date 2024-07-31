(function($) {
	let sorter = $('#results').tablesorter({
		debug: true,
		emptyTo: 'bottom',
		sortList: [[7,1]],
		selectorHeaders: '> thead tr.sorters th, > thead tr.sorters td',
	});

	function calculateResults() {
		let day = $('#day').val();
		let season = $('#season').val();
		let end = $('#end').val();
		let plots = $('#plots').val();
		let bottleCost = $('#bottle_cost').val();
		let pixies = $('#pixies').val();
		let greenhouse = $('#greenhouse').is(':checked');
		let repurchase = $('#repurchase').is(':checked');
		let free = $('#free').is(':checked');
		let showRevenue = $('#revenue').is(':checked');

		// no season chosen yet
		if (season === null) {
			return;
		}

		// resolve "spring" => 1
		season = SeasonLookup[season];

		let startDate = GameDate.NewHuman(season, day);
		let endDate = null;

		if (end === "auto") {
			endDate = GameDate.NewHuman(season, DaysPerSeason);
		} else {
			endDate = GameDate.NewHuman(SeasonLookup[end], 1).Previous();
		}

		let pixieBoost = 1;
		if (pixies) {
			let pixieName = PixieLookup[pixies];
			pixieBoost = PixieBoosts[pixieName];
		}

		///////////////////////////////////////////
		// simulate farming all crops

		let totalHarvest = [];
		AllCrops.forEach(function (cropIdentifier) {
			let crop = CropInfos[cropIdentifier];

			// let the crop grow and collect the raw harvest
			let result = GrowCrop(startDate, endDate, crop, greenhouse, repurchase ? UnlimitedPurchases : 1);

			// calculate basic stats
			let harvestedRawUnits = result.harvests * crop.unitsPerHarvest;
			let totalRawUnits = plots * harvestedRawUnits;

			let seedExpenses = free ? 0 : (result.purchases * crop.buyPrice);
			let totalSeedExpenses = plots * seedExpenses;

			let totalRawRevenue = totalRawUnits * crop.rawSellPrice;
			let totalRawIncome = totalRawRevenue - totalSeedExpenses;

			let tableRow = {
				crop: cropIdentifier,
				cropName: CropNames[cropIdentifier],

				plantings: plots * result.purchases,
				harvests:  plots * result.harvests,

				rawGoods: {
					units:    totalRawUnits,
					expenses: totalSeedExpenses,
					revenue:  totalRawRevenue,
					income:   totalRawIncome,
				},
				refinedGoods: null,
			};

			// if possible, refine the raw harvest into refined goods
			let refined = RefineGood(crop, totalRawUnits, bottleCost, pixieBoost);

			if (refined !== null) {
				let totalRefinedIncome = refined.revenue - (refined.expenses + totalSeedExpenses);

				tableRow.refinedGoods = {
					units: refined.refinedUnits,
					expenses: refined.expenses,
					revenue: refined.revenue,
					income: totalRefinedIncome,
				};
			}

			totalHarvest.push(tableRow);
		});

		totalHarvest.sort(function(a, b) {
			return b.rawGoods.income - a.rawGoods.income;
		});

		///////////////////////////////////////////
		// handle revenue toggle

		$('#results').toggleClass('show-revenue', showRevenue);
		$('#table-container').toggleClass('container-fluid', showRevenue).toggleClass('container', !showRevenue);
		$('#raw-goods-header').attr('colspan', showRevenue ? 4 : 3);
		$('#refined-goods-header').attr('colspan', showRevenue ? 4 : 3);

		///////////////////////////////////////////
		// overwrite results table markup with new harvest

		let resultsBody = $('#results tbody');
		$.tablesorter.clearTableBody(sorter);
		// $('tr', resultsBody).remove();

		let formatter = new Intl.NumberFormat();

		totalHarvest.forEach(function(harvest) {
			let crop = CropInfos[harvest.crop];

			let classes = 'harvest crop-' + harvest.crop;
			if (harvest.rawGoods.units === 0) {
				classes += ' empty';
			}

			let refinedColumns = `<td class="no-refinement colgroup" colspan="${showRevenue ? 4 : 3}"></td>`;
			if (harvest.refinedGoods !== null) {
				classes += ' refineable';
				refinedColumns = `
				<td class="refined-costs gold colgroup">${formatter.format(harvest.refinedGoods.expenses)}</td>
				<td class="refined-units">${formatter.format(harvest.refinedGoods.units)}</td>
				<td class="refined-revenue gold">${formatter.format(harvest.refinedGoods.revenue)}</td>
				<td class="refined-income gold">${formatter.format(harvest.refinedGoods.income)}</td>
				`;
			} else {
				refinedColumns = `
				<td class="refined-costs colgroup"></td>
				<td class="refined-units"></td>
				<td class="refined-revenue"></td>
				<td class="refined-income"></td>
				`;
			}

			let stats = `<span class="mature-time">${crop.maturingDays}<small>⭡</small></span>`
			if (crop.repeatHarvest > 0) {
				stats += ` <span class="repeat">${crop.repeatHarvest}<small>⭯</small></span>`
			}

			resultsBody.append(`
			<tr class="${classes}">
				<th class="name">${harvest.cropName}</th>
				<th class="stats">${stats}</th>
				<td class="plantings">${formatter.format(harvest.plantings)}</td>
				<td class="harvests">${formatter.format(harvest.harvests)}</td>
				<td class="raw-costs gold colgroup">${formatter.format(harvest.rawGoods.expenses)}</td>
				<td class="raw-units">${formatter.format(harvest.rawGoods.units)}</td>
				<td class="raw-revenue gold">${formatter.format(harvest.rawGoods.revenue)}</td>
				<td class="raw-income gold">${formatter.format(harvest.rawGoods.income)}</td>
				${refinedColumns}
			</tr>
		`)
		});

		sorter.trigger('update', [true, null]);
		$('#table-container').removeClass('is-incomplete').addClass('is-complete');
	}

	$('#form input, #form select').on('change', calculateResults);
	calculateResults();

}(jQuery));
