///////////////////////////////////////////
// seasons

function NextSeason(season) {
	return (season + 1) % NumSeasons;
}

function PreviousSeason(season) {
	season--;
	if (season < 0) {
		return NumSeasons - 1;
	}

	return season;
}

function StartOfSeason() {
	return GameDate.NewRaw(s, 0);
}

function EndOfSeason() {
	return GameDate.NewRaw(s, DaysPerSeason-1);
}

const Seasons = {
	Winter: 0,
	Spring: 1,
	Summer: 2,
	Autumn: 3,
}

const NumSeasons = Object.keys(Seasons).length;

const SeasonLookup = {
	"winter": Seasons.Winter,
	"spring": Seasons.Spring,
	"summer": Seasons.Summer,
	"autumn": Seasons.Autumn,
};

let SeasonNames = [];
SeasonNames[Seasons.Winter] = "Winter";
SeasonNames[Seasons.Spring] = "Spring";
SeasonNames[Seasons.Summer] = "Summer";
SeasonNames[Seasons.Autumn] = "Autumn";

///////////////////////////////////////////
// dates

const DaysPerSeason = 30;

class GameDate {
	constructor(num) {
		this.num = num;
	}

	static NewHuman(season, day) {
		return GameDate.NewRaw(season, day-1);
	}

	static NewRaw(season, day) {
		return new GameDate(season*DaysPerSeason + day);
	}

	DayOfSeason() {
		return this.num - (this.Season() * DaysPerSeason);
	}

	Season() {
		return Math.floor(this.num / DaysPerSeason);
	}

	Next() {
		if (this.num >= lastDate.num) {
			return new GameDate(0);
		}

		return new GameDate(this.num + 1);
	}

	Previous() {
		if (this.num <= 0) {
			return lastDate
		}

		return new GameDate(this.num - 1);
	}

	NextSeason() {
		return new GameDate(NextSeason(this.Season()) * DaysPerSeason);
	}

	PreviousSeason() {
		return new GameDate(PreviousSeason(this.Season()) * DaysPerSeason);
	}

	Equal(other) {
		return this.num == other.num;
	}

	Add(days) {
		let result = this;

		for (let i = 0; i < days; i++) {
			result = result.Next();
		}

		return result;
	}
}

const lastDate = new GameDate(DaysPerSeason*NumSeasons - 1);

///////////////////////////////////////////
// machines

const Machines = {
	Churner: 0,
	Press:   1,
	Refiner: 2,
};

///////////////////////////////////////////
// machines

const Pixies = {
	None:    0,
	Red:     1,
	Rainbow: 2,
};

const PixieLookup = {
	"":        Pixies.None,
	"red":     Pixies.Red,
	"rainbow": Pixies.Rainbow,
};

let PixieBoosts = [];
PixieBoosts[Pixies.None] = 1;
PixieBoosts[Pixies.Red] = 2;
PixieBoosts[Pixies.Rainbow] = 3;

///////////////////////////////////////////
// crops

class Crop {
	constructor(buyPrice, rawSellPrice, refinedSellPrice, unitsPerRefinement, maturingDays, repeatHarvest, unitsPerHarvest, seasons, machine) {
		this.buyPrice           = buyPrice;
		this.rawSellPrice       = rawSellPrice;
		this.refinedSellPrice   = refinedSellPrice;
		this.unitsPerRefinement = unitsPerRefinement;
		this.maturingDays       = maturingDays;
		this.repeatHarvest      = repeatHarvest;
		this.unitsPerHarvest    = unitsPerHarvest;
		this.seasons            = seasons;
		this.machine            = machine;
	}
}

const Crops = {
	Blueberry:     'blueberry',
	Carrot:        'carrot',
	Cauliflower:   'cauliflower',
	ChiliPepper:   'chilipepper',
	Corn:          'corn',
	Daikon:        'daikon',
	Donberry:      'donberry',
	Eggplant:      'eggplant',
	FairyFruit:    'fairyfruit',
	HoneydewMelon: 'honeydewmelon',
	Kobo:          'kobo',
	Kupiberry:     'kupiberry',
	Lemon:         'lemon',
	Onion:         'onion',
	Potato:        'potato',
	Pumpkin:       'pumpkin',
	Rice:          'rice',
	Rockmelon:     'rockmelon',
	Sourberry:     'sourberry',
	Soybean:       'soybean',
	Strawberry:    'strawberry',
	Tomato:        'tomato',
	Turnip:        'turnip',
	Wheat:         'wheat',
	Watermelon:    'watermelon',
	Winterberry:   'winterberry',
};

let CropNames = {};
CropNames[Crops.Blueberry]     = "Blueberry";
CropNames[Crops.Carrot]        = "Carrot";
CropNames[Crops.Cauliflower]   = "Cauliflower";
CropNames[Crops.ChiliPepper]   = "Chili Pepper";
CropNames[Crops.Corn]          = "Corn";
CropNames[Crops.Daikon]        = "Daikon";
CropNames[Crops.Donberry]      = "Donberry";
CropNames[Crops.Eggplant]      = "Eggplant";
CropNames[Crops.FairyFruit]    = "FairyFruit";
CropNames[Crops.HoneydewMelon] = "Honeydew Melon";
CropNames[Crops.Kobo]          = "Kobo";
CropNames[Crops.Kupiberry]     = "Kupiberry";
CropNames[Crops.Lemon]         = "Lemon";
CropNames[Crops.Onion]         = "Onion";
CropNames[Crops.Potato]        = "Potato";
CropNames[Crops.Pumpkin]       = "Pumpkin";
CropNames[Crops.Rice]          = "Rice";
CropNames[Crops.Rockmelon]     = "Rockmelon";
CropNames[Crops.Sourberry]     = "Sourberry";
CropNames[Crops.Soybean]       = "Soybean";
CropNames[Crops.Strawberry]    = "Strawberry";
CropNames[Crops.Tomato]        = "Tomato";
CropNames[Crops.Turnip]        = "Turnip";
CropNames[Crops.Wheat]         = "Wheat";
CropNames[Crops.Watermelon]    = "Watermelon";
CropNames[Crops.Winterberry]   = "Winterberry";

const AllCrops = [
	Crops.Blueberry,
	Crops.Carrot,
	Crops.Cauliflower,
	Crops.ChiliPepper,
	Crops.Corn,
	Crops.Daikon,
	Crops.Donberry,
	Crops.Eggplant,
	Crops.FairyFruit,
	Crops.HoneydewMelon,
	Crops.Kobo,
	Crops.Kupiberry,
	Crops.Lemon,
	Crops.Onion,
	Crops.Potato,
	Crops.Pumpkin,
	Crops.Rice,
	Crops.Rockmelon,
	Crops.Sourberry,
	Crops.Soybean,
	Crops.Strawberry,
	Crops.Tomato,
	Crops.Turnip,
	Crops.Wheat,
	Crops.Watermelon,
	Crops.Winterberry,
];

let CropInfos = {};
CropInfos[Crops.Blueberry]     = new Crop(80, 11, 310, 10, 11, 5, 3, [Seasons.Summer], Machines.Press);
CropInfos[Crops.Carrot]        = new Crop(10, 35, 0, 0, 3, 0, 1, [Seasons.Spring, Seasons.Summer], null);
CropInfos[Crops.Cauliflower]   = new Crop(50, 122, 0, 0, 6, 0, 1, [Seasons.Spring], null);
CropInfos[Crops.ChiliPepper]   = new Crop(30, 22, 0, 0, 9, 4, 2, [Seasons.Spring, Seasons.Summer], null);
CropInfos[Crops.Corn]          = new Crop(40, 15, 50, 1, 7, 3, 2, [Seasons.Summer, Seasons.Autumn], Machines.Refiner);
CropInfos[Crops.Daikon]        = new Crop(20, 70, 0, 0, 5, 0, 1, [Seasons.Winter], null);
CropInfos[Crops.Donberry]      = new Crop(40, 15, 260, 3, 7, 2, 2, [Seasons.Spring], Machines.Press);
CropInfos[Crops.Eggplant]      = new Crop(110, 68, 0, 0, 8, 4, 1, [Seasons.Winter, Seasons.Spring], null);
CropInfos[Crops.FairyFruit]    = new Crop(180, 77, 0, 0, 10, 4, 1, [Seasons.Winter], null);
CropInfos[Crops.HoneydewMelon] = new Crop(65, 155, 0, 0, 9, 0, 1, [Seasons.Autumn], null);
CropInfos[Crops.Kobo]          = new Crop(25, 79, 0, 0, 4, 0, 1, [Seasons.Autumn], null);
CropInfos[Crops.Kupiberry]     = new Crop(180, 25, 0, 0, 7, 3, 4, [Seasons.Summer, Seasons.Autumn], null);
CropInfos[Crops.Lemon]         = new Crop(70, 65, 0, 0, 10, 5, 1, [Seasons.Winter, Seasons.Spring], null);
CropInfos[Crops.Onion]         = new Crop(50, 88, 0, 0, 5, 0, 1, [Seasons.Spring], null);
CropInfos[Crops.Potato]        = new Crop(14, 45, 0, 0, 3, 0, 1, [Seasons.Autumn, Seasons.Winter], null);
CropInfos[Crops.Pumpkin]       = new Crop(110, 230, 0, 0, 8, 0, 1, [Seasons.Autumn], null);
CropInfos[Crops.Rice]          = new Crop(8, 3, 60, 2, 4, 0, 1, [Seasons.Autumn, Seasons.Winter], Machines.Refiner);
CropInfos[Crops.Rockmelon]     = new Crop(70, 220, 0, 0, 14, 0, 1, [Seasons.Spring], null);
CropInfos[Crops.Sourberry]     = new Crop(150, 12, 0, 0, 8, 2, 3, [Seasons.Winter, Seasons.Spring], null);
// Soybeans may become tofu (3 beans = 1 tofu = 110 gold) or some juice (10 beans = 1 soy milk = 390 gold)
CropInfos[Crops.Soybean]       = new Crop(15, 5, 390, 10, 7, 2, 4, [Seasons.Summer], Machines.Press);
CropInfos[Crops.Strawberry]    = new Crop(25, 110, 0, 0, 7, 0, 1, [Seasons.Summer, Seasons.Autumn], null);
CropInfos[Crops.Tomato]        = new Crop(60, 50, 0, 0, 10, 3, 1, [Seasons.Summer], null);
CropInfos[Crops.Turnip]        = new Crop(36, 64, 0, 0, 5, 0, 1, [Seasons.Winter, Seasons.Spring], null);
CropInfos[Crops.Wheat]         = new Crop(8, 3, 60, 2, 4, 0, 1, [Seasons.Spring, Seasons.Summer], Machines.Refiner);
CropInfos[Crops.Watermelon]    = new Crop(100, 264, 0, 0, 11, 0, 1, [Seasons.Summer], null);
CropInfos[Crops.Winterberry]   = new Crop(70, 40, 0, 0, 12, 6, 3, [Seasons.Winter], null);

///////////////////////////////////////////
// farming simulation

const UnlimitedPurchases = -1;

function GrowCrop(planted, end, crop, greenhouse, maxPurchases) {
	const notPlanted = -1;

	let lastDay     = end.Next();
	let waitingDays = notPlanted;

	let purchases = 0;
	let harvests  = 0;

	for (let today = planted; !today.Equal(lastDay); today = today.Next()) {
		// if nothing is planted yet
		if (waitingDays == notPlanted) {
			if (purchases >= maxPurchases && maxPurchases != UnlimitedPurchases) {
				// we reached the limit and do not want to spend anymore
				break;
			}

			if (!inSeason(today, crop, greenhouse)) {
				// cannot plant today
				continue;
			}

			// purchase a seed and plant, but only if we can expect to actually
			// harvest it
			let harvestDay = today.Add(crop.maturingDays);
			if (dayIsBefore(today, harvestDay, lastDay) && inSeason(harvestDay, crop, greenhouse)) {
				purchases++;
				waitingDays = crop.maturingDays;
			}

			// onto the next day
			continue;
		}

		if (!inSeason(today, crop, greenhouse)) {
			// kill the plant
			waitingDays = notPlanted;
			continue;
		}

		// let the plant mature
		waitingDays--;

		// crop is mature or was harvested long enough since the last harvest
		if (waitingDays == 0) {
			harvests++;

			// crop can only be harvested once
			if (crop.repeatHarvest == 0) {
				// fmt.Printf("no more harvest possible")
				waitingDays = notPlanted;

				// now that we marked the plot as empty, re-run today's logic to trigger
				// a potential next purchase
				today = today.Previous();

				continue;
			}

			waitingDays = crop.repeatHarvest;
		}
	}

	return {purchases: purchases, harvests: harvests};
}

function RefineGood(crop, rawUnits, bottleCost, pixieBoost) {
	if (crop.machine === null) {
		return null;
	}

	if (rawUnits < crop.unitsPerRefinement) {
		return null;
	}

	let refinements  = Math.floor(rawUnits / crop.unitsPerRefinement);
	let refinedUnits = refinements * pixieBoost;
	let expenses     = 0;
	let revenue      = refinedUnits * crop.refinedSellPrice;

	if (crop.machine !== Machines.Refiner) {
		expenses = refinements * bottleCost;
	}

	return {
		refinements:  refinements,
		refinedUnits: refinedUnits,
		expenses:     expenses,
		revenue:      revenue,
	};
}

function dayIsBefore(ref, a, b) {
	for (let today = ref; !today.Equal(a.Next()); today = today.Next()) {
		if (today.Equal(b)) {
			return false;
		}
	}

	return true;
}

function inSeason(today, crop, greenhouse) {
	return greenhouse || crop.seasons.includes(today.Season());
}
