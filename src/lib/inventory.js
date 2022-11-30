/**
 * Map of resourceIds to details
 * massPerUnit is in tonnes / unit
 * volumePerUnit is in cubic meters / unit
 */
export const RESOURCES = {
  1: { name: 'Water', category: 'Volatile', massPerUnit: 0.001, volumePerUnit: 0.103, iconVersion: 1, modelVersion: 1 },
  2: { name: 'Hydrogen', category: 'Volatile', massPerUnit: 0.001, volumePerUnit: 6.1, iconVersion: 1, modelVersion: 1 },
  3: { name: 'Ammonia', category: 'Volatile', massPerUnit: 0.001, volumePerUnit: 0.16, iconVersion: 1, modelVersion: 1 },
  4: { name: 'Nitrogen', category: 'Volatile', massPerUnit: 0.001, volumePerUnit: 0.12, iconVersion: 1, modelVersion: 1 },
  5: { name: 'Sulfur Dioxide', category: 'Volatile', massPerUnit: 0.001, volumePerUnit: 0.072, iconVersion: 1, modelVersion: 1 },
  6: { name: 'Carbon Dioxide', category: 'Volatile', massPerUnit: 0.001, volumePerUnit: 0.66, iconVersion: 1, modelVersion: 1 },
  7: { name: 'Carbon Monoxide', category: 'Volatile', massPerUnit: 0.001, volumePerUnit: 1.7, iconVersion: 1, modelVersion: 1 },
  8: { name: 'Methane', category: 'Volatile', massPerUnit: 0.001, volumePerUnit: 2.8, iconVersion: 1, modelVersion: 1 },
  9: { name: 'Apatite', category: 'Organic', massPerUnit: 0.001, volumePerUnit: 0.052, iconVersion: 1, modelVersion: 1 },
  10: { name: 'Bitumen', category: 'Organic', massPerUnit: 0.001, volumePerUnit: 0.16, iconVersion: 1, modelVersion: 1 },
  11: { name: 'Calcite', category: 'Organic', massPerUnit: 0.001, volumePerUnit: 0.062, iconVersion: 1, modelVersion: 1 },
  12: { name: 'Feldspar', category: 'Metal', massPerUnit: 0.001, volumePerUnit: 0.065, iconVersion: 1, modelVersion: 1 },
  13: { name: 'Olivine', category: 'Metal', massPerUnit: 0.001, volumePerUnit: 0.062, iconVersion: 1, modelVersion: 1 },
  14: { name: 'Pyroxene', category: 'Metal', massPerUnit: 0.001, volumePerUnit: 0.048, iconVersion: 1, modelVersion: 1 },
  15: { name: 'Coffinite', category: 'Fissile', massPerUnit: 0.001, volumePerUnit: 0.03, iconVersion: 1, modelVersion: 1 },
  16: { name: 'Merrillite', category: 'Rare Earth', massPerUnit: 0.001, volumePerUnit: 0.053, iconVersion: 1, modelVersion: 1 },
  17: { name: 'Xenotime', category: 'Rare Earth', massPerUnit: 0.001, volumePerUnit: 0.035, iconVersion: 1, modelVersion: 1 },
  18: { name: 'Rhabdite', category: 'Metal', massPerUnit: 0.001, volumePerUnit: 0.023, iconVersion: 1, modelVersion: 1 },
  19: { name: 'Graphite', category: 'Metal', massPerUnit: 0.001, volumePerUnit: 0.073, iconVersion: 1, modelVersion: 1 },
  20: { name: 'Taenite', category: 'Metal', massPerUnit: 0.001, volumePerUnit: 0.02, iconVersion: 1, modelVersion: 1 },
  21: { name: 'Troilite', category: 'Metal', massPerUnit: 0.001, volumePerUnit: 0.037, iconVersion: 1, modelVersion: 1 },
  22: { name: 'Uraninite', category: 'Fissile', massPerUnit: 0.001, volumePerUnit: 0.0155, iconVersion: 1, modelVersion: 1 },
  175: { name: 'Core Sampler', category: 'Tool', massPerUnit: 0.03, volumePerUnit: 0.4, iconVersion: 1, modelVersion: 1 }
};

/**
 * Converts a raw resourceIds / quantities array pair into a resource details set
 * @param {[integer]|object} resources Object with resourceId -> quantity OR array of resourceIds
 * @param {[integer]} quantities Array of quantities (required when resourcesSet is an array)
 * @returns An object with a set of resources and a total mass and volume (in tonnes and cubic meters)
 */
export const getContents = (resources, quantities = []) => {
  let resourceIds = resources;

  if (!Array.isArray(resources)) {
    resourceIds = Object.keys(resources);
    quantities = Object.values(resources);
  } else {
    if (resources.length !== quantities.length) throw new Error('Resources ids and quantities must match');
  }

  const resourceDetails = {};
  const totals = { mass: 0, volume: 0 };

  resourceIds.forEach((resourceId, index) => {
    const config = RESOURCES[Number(resourceId)];
    const quantity = quantities[index];
    const mass = quantity * config.massPerUnit;
    const volume = quantity * config.volumePerUnit;

    totals.mass += mass;
    totals.volume += volume;
    resourceDetails[Number(resourceId)] = {
      name: config.name, quantity, mass, massPerUnit: config.massPerUnit, volume, volumePerUnit: config.volumePerUnit
    };
  });

  return { resources: resourceDetails, totals };
};

/**
 * @param {integer} resourceId
 * @returns Details on the specific resource
 */
export const getResource = (resourceId) => {
  return RESOURCES[resourceId];
};

export default {
  RESOURCES,
  getContents,
  getResource
};