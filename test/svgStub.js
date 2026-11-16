const React = require('react');
const Stub = () => null;
module.exports = new Proxy({}, { get: (_target, key) => (key === '__esModule' ? true : Stub) });
void React;
