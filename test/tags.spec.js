 var nice = require('../index.js')();
 var Div = nice.Div;
 var expect = require('chai').expect;

 describe("Tags", function() {
   
  it("Div Span", function() {
    var div = nice.Span('qwe');
    expect(div.html()).to.equal('<span>qwe</span>');
  });

  it("Div B", function() {
    var div = nice.B('qwe');
    expect(div.html()).to.equal('<b>qwe</b>');
  });

  it("Div I", function() {
    var div = nice.I('qwe');
    expect(div.html()).to.equal('<i>qwe</i>');
  });

  it("Div A", function() {
    var div = nice.A('/qwe').add('click');
    expect(div.html()).to.equal('<a href="/qwe">click</a>');
  });

  it("Div Img", function() {
    var div = nice.Img('qwe.jpg');
//    console.log('---', div.children._result);
    expect(div.html()).to.equal('<img src="qwe.jpg"></img>');
  });

  it("Div Img", function() {
    var div = nice.Img('qwe.jpg');
//    console.log('---', div.children._result);
    expect(div.html()).to.equal('<img src="qwe.jpg"></img>');
  });
  
  it("Checkbox", function() {
    var c = nice.Checkbox(true);
    expect(c.html()).to.equal('<input type="checkbox" checked="true"></input>');
    expect(c.isChecked()).to.equal(true);
  });

  it("Textarea", function() {
    var t = nice.Textarea('qwe');
    expect(t.html()).to.equal('<textarea>qwe</textarea>');
    t.value('asd');
    expect(t.html()).to.equal('<textarea>asd</textarea>');
  });
  
  it("PagedList", function() {
    var list = nice.PagedList().add('qwe', 'asd', 'zxc').step(2);
    expect(list.html()).to
        .equal('<div>qweasd<div><b>1</b><a href="#">2</a></div></div>');
  });
 });
