export default class ApiFeatures {
  constructor(mongooseQuery, QueryString) {
    this.mongooseQuery = mongooseQuery;
    this.QueryString = QueryString;
  }

  pagination() {
    //implicit compression to convert from string page to number page
    //1-pagination
    let page = this.QueryString.page * 1 || 1;
    if (this.QueryString.page <= 0) page = 1;
    let skip = (page - 1) * 2;
    this.page=page
    this.mongooseQuery.skip(skip).limit(2);
    return this;
  }

  filter() {
    //2-filter
    // let filterobj=req.query ==>will cause problem in query if we write page number
    //decopy so the filterobj has address and query another address
    let filterobj = { ...this.QueryString };
    let excludeQuery = ["page", "sort", "keyword", "fields"];
    excludeQuery.forEach((q) => {
      delete filterobj[q];
    });
    filterobj = JSON.stringify(filterobj);
    filterobj = filterobj.replace(/\bgte|gt|lte|lt\b/g, (match) => `$${match}`);
    filterobj = JSON.parse(filterobj);
    //3-sort
    //build query
    this.mongooseQuery.find(filterobj);
    return this;
  }

  sort() {
    if (this.QueryString.sort) {
      // i do this as i have increase one option in sort so must remove comma between them to sort them in db
      let sortBy = this.QueryString.sort.split(",").join(" "); //["price","sold"]==> "price" "sold"
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }

  search() {
    //4-search
    if (this.QueryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.QueryString.keyword, $options: "i" } },
          { description: { $regex: this.QueryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }
  fields() {
    if (this.QueryString.fields) {
      let fields = this.QueryString.fields.split(',').join(' ');
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}
