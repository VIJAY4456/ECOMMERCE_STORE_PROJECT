// Class to handle search, filter, and pagination for MongoDB queries
class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query; // Initial MongoDB query
    this.queryStr = queryStr; // Request query parameters
  }

  // Method to apply search filter
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, // Find products with names matching the keyword
            $options: "i", // Case-insensitive search
          },
        }
      : {};

    this.query = this.query.find({ ...keyword }); // Modify query to include search filter
    return this; // Return this instance for chaining methods
  }

  // Method to apply filters like price, rating, etc.
  filter() {
    const queryCopy = { ...this.queryStr }; // Copy of request query parameters
    const removeFields = ["keyword", "page", "limit"]; // Fields to exclude from filters

    removeFields.forEach((key) => delete queryCopy[key]); // Remove excluded fields from queryCopy

    let queryStr = JSON.stringify(queryCopy); // Convert queryCopy to string
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); // Add $ to filter operators for MongoDB

    this.query = this.query.find(JSON.parse(queryStr)); // Modify query to include filters
    return this; // Return this instance for chaining methods
  }

  // Method to apply pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; // Get current page from query or default to 1

    const skip = resultPerPage * (currentPage - 1); // Calculate number of products to skip

    this.query = this.query.limit(resultPerPage).skip(skip); // Modify query to limit results and skip to the correct page
    return this; // Return this instance for chaining methods
  }
}

module.exports = ApiFeatures; // Export the ApiFeatures class for use in other files
