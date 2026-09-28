/* ChocMath engine - pure functions, no DOM. Honest bean-to-bar chocolate math.
   Constants stated in the UI: roast loss 6% of raw weight, winnow loss 22% of
   roasted weight (husk), a 70% dark bar means 70% nib-equivalent solids,
   temper working points dark 31.5C / milk 29.5C / white 28.5C, bar mold 60g. */
var ChocMath = (function () {
  function nibsFromRaw(rawG) {
    var roasted = rawG * (1 - 0.06);
    var nibs = roasted * (1 - 0.22);
    return { roasted: roasted, nibs: nibs, husk: roasted - nibs };
  }
  function nibVerdict(yieldPct) {
    if (yieldPct >= 0.75) return 'Great winnow - 75%+ of raw weight as nibs means clean beans and a sharp crack.';
    if (yieldPct >= 0.70) return 'Typical - around 72% nib yield is the honest expectation, not the bag weight.';
    return 'Low yield - either the roast was light, the crack was coarse, or the husk is hanging on.';
  }
  function recipe(nibsG, darkPct) {
    var total = nibsG / (darkPct / 100);
    return { total: total, sugar: total - nibsG };
  }
  function recipeVerdict(darkPct) {
    if (darkPct >= 85) return 'Over 85% - punishing and proud; the beans better be excellent because nothing hides.';
    if (darkPct >= 70) return 'The craft sweet spot - 70 to 80% lets the origin speak and still tastes like a treat.';
    if (darkPct >= 55) return 'Approaching semisweet - friendly territory, more sugar than the bag copy suggests.';
    return 'Under 55% nib solids - that is candy, which is fine, just not bean-to-bar bragging.';
  }
  function temperVerdict(kind, tempC) {
    var target = kind === 'milk' ? 29.5 : kind === 'white' ? 28.5 : 31.5;
    var d = tempC - target;
    if (Math.abs(d) <= 0.5) return 'At the ' + kind + ' working point (' + target + 'C) - mold it now, it is in temper if the seed was right.';
    if (d > 0) return (d > 2 ? 'Way' : 'A little') + ' too warm for ' + kind + ' (' + target + 'C) - the good crystals melt out above it; cool and re-seed.';
    return 'Too cool for ' + kind + ' (' + target + 'C) - it will thicken and streak; rewarm gently, do not blow past.';
  }
  function bars(totalBatchG, barG) {
    return { bars: totalBatchG / barG, leftover: totalBatchG % barG };
  }
  function costPerBar(nibsG, beanCostKg, sugarG, sugarCostKg, barCount) {
    var beanCost = nibsG / 0.7272 / 1000 * beanCostKg;
    var sugarCost = sugarG / 1000 * sugarCostKg;
    return (beanCost + sugarCost) / barCount;
  }
  function costVerdict(perBar) {
    if (perBar <= 2) return 'Under $2 a bar in ingredients - the craft bar economics work; your hours are the real ingredient.';
    if (perBar <= 4) return 'Craft-shop cost - still half the shelf price of the fancy wrapper.';
    return 'Over $4 a bar in ingredients - fine beans are expensive; this is the honest cost of the good stuff.';
  }
  return {
    nibsFromRaw: nibsFromRaw, nibVerdict: nibVerdict, recipe: recipe, recipeVerdict: recipeVerdict,
    temperVerdict: temperVerdict, bars: bars, costPerBar: costPerBar, costVerdict: costVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = ChocMath;
