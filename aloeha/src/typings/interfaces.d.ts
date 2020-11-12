/**
 * TODO: fill in remaining params
 * 
 * Moisture values:
 * Dry
 * Dry Moist
 * Moist
 * Moist Damp
 * Damp
 * 
 * Canopy values:
 * 15: Floor - plants and shrubs, requires the least amount of sunlight
 * 55: Understory - small trees, requires less than average amounts of sunlight
 * 95: Canopy - medium size trees, requires more than average amounts of sunlight
 * 125: Emergent - largest trees, requires the most amount of sunlight
 * 
 * Source values: 
 * University of Delaware Flora Database: Plant data originated from the UDel Flora Database @ http://www.wrc.udel.edu/de-flora/
 * Chesapeake Bay Native Plant Center: Plant data originated from the Chesapeake Bay Native Plant Center @ http://www.nativeplantcenter.net/plants/
 * Sunny Edge Plants in Arden, Newark: Plant data originated from spreadsheet on native forest edge plants
 * provided by a client.
 * USDA's Natural Resources Conservation Service: Plant data originated from the USDA's Natural Resource Conservation Service @ https://plants.sc.egov.usda.gov/java/characteristics 
 * 
 * Soil type values:
 * Clay
 * Sandy 
 * Loamy
 * Any
 */
interface Plant {
    id: string,
    latinName: string,
    commonName: string[],
    description: string,
    bloomTime: boolean[],
    light: number,
    moisture: string,
    soilType: string,
    canopy: number,
    delawareNative: boolean,
    invasive: boolean,
    source: string[]
}

interface User {

    name: string,
    length: number,
    width: number,
    plotItems: string[], // Give type for Items
    moisture: string,
    soil: string,
    sunlight: string,
    seasonsWanted: string[],
    colorsWanted: string[]
}