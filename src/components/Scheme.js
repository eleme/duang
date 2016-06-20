def(() => {

  const schemeMap = Object.create(null);
  config.schemes.forEach(scheme => schemeMap[scheme.key] = scheme);

  return class extends Jinkela {
    get key() { return new UParams().key; }
    get scheme() {
      let value = schemeMap[this.key];
      Object.defineProperty(this, 'scheme', { value });
      return value;
    }
    get queryParams() {
      let params = {};
      let { page, where } = new UParams();
      if (this.scheme.pageSize) {
        params.limit = this.scheme.pageSize;
        params.offset = this.scheme.pageSize * (page - 1 || 0);
      }
      if (where) params.where = where;
      return new UParams(params);
    }
  };

});
