nice.MapPrototype = {
  _typeTitle: 'Map',

  _creator: () => {
    var f = function (...a){
      if(a.length === 0){
        f._compute();
        return f._getData();
      }

      var v = a[0];
      if(arguments.length === 1 && v !== undefined && !nice.is.Object(v))
        return f.get(v);

      if(!nice.is.Object(v)){
        var o = {};
        o[v] = a[1];
        v = o;
      }
      f.assign(v);
      return f._container || f;
    };
    f.size = nice.Number();
    return f;
  },

  _default: () => { return {}; },

  clear: function () {
    return this.transactionEach((v, k) => this.delete(k));
  },

  has: function (k) {
    return !!this(k);
  },

  assign: function (o) {
    this.transactionStart();
    nice.each((v, k) => this.set(k, v), o);
    this._selfStatus && this._transactionStart++;
    this.transactionEnd();
  },

  replace: function(o){
    this.expect(o, 'Not an object povided for replace').toBeObject();

    if(o === this._getData())
      return o;

    this.transactionStart();
    this._setData(o);
    this._selfStatus && this._transactionStart++;
    this.resolve();
    this.transactionEnd();
    return this;
  },

  get: function(k){
    if(!this._itemType)
      return this._getData()[k];

    this._children = this._children || {};

    if(this._children.hasOwnProperty(k))
      return this._children[k];

    this.size.inc();
    return this._children[k] = nice._createItem(this._itemType, this, k);
  },

  set: function(k, v){
    if(this._itemType){
      this.get(k)(v);
    } else {
      var old = this._getData()[k];
      if(old === v)
        return;
      old === undefined && this.size.inc();
      this._assertData()[k] = v;
      this.resolve();
    }
  },

  delete: function(k){
    var old = this._getData()[k];
    old !== undefined && this.size.dec();
    delete this._getData()[k];
    this.resolve();
  },

  filter: function (f) {
    return nice.Map().by(z => z.replace(nice.filter(f, z.use(this)())));
  },

  mapFilter: function (f) {
    return nice.Map().by(z => z.replace(nice.mapFilterObject(f, z.use(this)())));
  },

  each: function(f){
    var o = this._getData();
    if(!o) return;
    for (let i in o)
      f(o[i], i, o);
  },

  map: function (f) {
    return nice.Map().by(z => z(nice.map(f, z.use(this)())));
  },


  mapArray: function (f) {
    return nice.Array().by(z => z.replace(nice.mapArray(f, z.use(this)())));
  },


  of: function(type){
    this._itemType = type;
    return this;
  },

  _compareItems: nice.objectComparer
};


Object.defineProperty(nice.MapPrototype, 'values', {get: function(){
  var res = nice.Array();
  this.listenBy(() => {
    res.clear();
    this.each(v => res(v));
  });
  return res;
}});


Object.defineProperty(nice.MapPrototype, 'keys', {get: function(){
  var res = nice.Array();
  this.listenBy(() => {
    res.clear();
    this.each((v,k) => res(k));
  });
  return res;
}});

nice.MapPrototype['mapObject'] = nice.MapPrototype['map'];

nice.collectionMethods(nice.MapPrototype);

['findKey'].forEach(k => {
  nice.MapPrototype[k] = function(f) { return nice[k](f, this()); }
});


nice.Type(nice.MapPrototype);