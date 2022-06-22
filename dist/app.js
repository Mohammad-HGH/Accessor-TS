"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// TODO: Log 
function Log(target, name) {
    // console.log( "Property decorator:" )
    // console.log( target )
    // console.log( name )
}
// * Log 2
function Log2(target, name, descriptor) {
    // console.log( 'Access decorator:' )
    // console.log( target )
    // console.log( name )
    // console.log( descriptor, '2' )
}
// ! Log 3
function Log3(target, name, descriptor) {
    // console.log( 'Method decorator:' )
    // console.log( target )
    // console.log( name )
    // console.log( descriptor, '3' )
}
// ? Log 4
function Log4(target, name, argPosition) {
    // console.log( 'Parameter decorator:' )
    // console.log( target )
    // console.log( name )
    // console.log( argPosition )
}
/**
 * TODO: ==> TARGET={ constructor, getPriceWithTax, set price }
 * *     ==> TARGET={ constructor, getPriceWithTax, set price }
 * !     ==> TARGET={ constructor, getPriceWithTax, set price }
 * ?     ==> TARGET={ constructor, getPriceWithTax, set price }
 */
/**
 * TODO: ==>  NAME = _price
 * *     ==>  NAME = price
 * !     ==>  NAME = getPriceWithTax
 * ?     ==>  NAME = getPriceWithTax
 */
/**
 * TODO: ==>  ---
 * *     ==>  DESCRIPTOR = { get: undefined, enumerable: false, configurable: true, set: ƒ }
 * !     ==>  DESCRIPTOR = { writable: true, enumerable: false, configurable: true, value: ƒ }
 * ?     ==>  argPosition = 0
 */
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0)
            this._price = val;
        else
            throw new Error('Invalid price - should be positive!');
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "_price", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
