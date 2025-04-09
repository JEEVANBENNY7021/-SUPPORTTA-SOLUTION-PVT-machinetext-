let count = 1;
function generateProductId() {
  return `PROD${String(count++).padStart(3, '0')}`;
}
module.exports = generateProductId;
