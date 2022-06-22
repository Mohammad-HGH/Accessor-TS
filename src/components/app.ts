// TODO: Log 
function Log ( target: any, name: string | symbol ) {
    // console.log( "Property decorator:" )
    // console.log( target )
    // console.log( name )
}


// * Log 2
function Log2 ( target: any, name: string, descriptor: PropertyDescriptor ) {
    // console.log( 'Access decorator:' )
    // console.log( target )
    // console.log( name )
    // console.log( descriptor, '2' )
}


// ! Log 3
function Log3 ( target: any, name: string | Symbol, descriptor: PropertyDescriptor ) {
    // console.log( 'Method decorator:' )
    // console.log( target )
    // console.log( name )
    // console.log( descriptor, '3' )
}


// ? Log 4
function Log4 ( target: any, name: string | Symbol, argPosition: number ) {
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

    @Log
    private _price: number
    title: string //! that's other propertyName but this is shown when be closest to @Log

    constructor ( t: string, p: number ) {
        this.title = t
        this._price = p
    }

    @Log2
    set price ( val: number ) {
        if ( val > 0 ) this._price = val
        else throw new Error( 'Invalid price - should be positive!' )
    }


    @Log3
    getPriceWithTax ( @Log4 tax: number ) {
        return this._price * ( 1 + tax )
    }
}

