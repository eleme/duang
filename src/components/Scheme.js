def(() => {

  const schemeMap = Object.create(null);
  config.forEach(scheme => schemeMap[scheme.key] = scheme);

  return class extends Jinkela {
    get scheme() {
      let { key } = new UParams();
      Object.defineProperty(this, 'scheme', { value: schemeMap[key] });
      return schemeMap[key];
    }
  };

});
