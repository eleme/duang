def(() => class extends Jinkela {
  get scheme() {
    let { key } = new UParams();
    let scheme;
    for (scheme of config) if (scheme.key === key) break;
    Object.defineProperty(this, 'scheme', { value: scheme });
    return scheme;
  }
});
