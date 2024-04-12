

export default class ApiFeature {
  constructor(dbQuery, searchQuery) {
    this.dbQuery = dbQuery;
    this.searchQuery = searchQuery;
  }
  pagination() {
    let page = this.searchQuery.page * 1 || 1;
    if (page < 0) page = 1;
    let limit = this.searchQuery.limit * 1 || 0;
    if (limit < 0) limit = 0;
    let skip = (page - 1) * limit;
    this.dbQuery.skip(skip).limit(limit);
    return this;
  }
  search() {
    let keyWord = this.searchQuery.keyWord;
    if (keyWord) {
      this.dbQuery.find({
        $or: [
          { title: { $regex: keyWord } },
          { description: { $regex: keyWord } },
          { comment: { $regex: keyWord } },
        ],
      });
    }
    return this;
  }
  filter() {
    let excluded = ["keyWord", "page", "limit", "sort", "fields"];
    let filterObj = { ...this.searchQuery };

    excluded.forEach((val) => delete filterObj[val]);

    filterObj = JSON.stringify(filterObj).replace(
      /gt|gte|lt|lte/,
      (match) => `$${match}`
    );

    filterObj = JSON.parse(filterObj);

    this.dbQuery.find(filterObj);

    return this;
  }
  sort() {
    let sort = this.searchQuery.sort;
    if (sort) {
      let sorted = sort.split(",").join(" ");

      this.dbQuery.sort(sorted);
    }
    return this;
  }
  fields() {
    let fields = this.searchQuery.fields;
    if (fields) {
      let fieldsBy = fields.split(",").join(" ");

      this.dbQuery.select(fieldsBy);
    }
    return this;
  }
}