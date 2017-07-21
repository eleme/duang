def(() => class extends Jinkela {
  get template() {
    return `
      <div>
        <h1>{h1}</h1>
        <h2>{h2}</h2>
      </div>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        margin-top: 1em;
        h1 {
          display: inline-block;
          font-size: 1.5em;
          margin: 0;
        }
        h2 {
          display: inline-block;
          font-size: 1em;
          font-weight: normal;
          margin: 0;
          margin-left: 1em;
        }
        overflow: hidden;
      }
      /* 黑科技 */
      .table > :first-child :scope {
        margin-top: 0em;
      }
    `;
  }
});
