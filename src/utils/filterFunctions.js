export const getAvailableMaterials = (allMaterials, selectedMaterials, key = 'id') => {
  if (!allMaterials || !Array.isArray(allMaterials)) return [];
  if (!selectedMaterials || !Array.isArray(selectedMaterials)) return allMaterials;
  const selectedIds = new Set(selectedMaterials.map(material => material[key]));
  return allMaterials.filter(material => !selectedIds.has(material[key]));
};