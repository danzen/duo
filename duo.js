/*
duo(func, args, sig, scope)

duo
global function

DESCRIPTION
A system to build functions or classes that allow traditional parameters
or a configuration object passed in as a single parameter.
The configuration object has property names that match the function arguments.
Works also with JS6 default parameter values.

To use duo on your functions, pass in a function and the function's arguments
and insert duo into first line of your function as shown below.
Replace yourFunction with a reference to your function but keep arguments as is.

EXAMPLE
function yourFunction(a,b,c){
	var d; if (d = duo(yourFunction, arguments)) return d;
    console.log(a,b,c);
};
yourFunction(1,null,3); // traditional parameters in order
yourFunction({a:1,c:3}); // configuration object with duo
END EXAMPLE

NOTE: if you are minifying the file then you need to do an extra step
add a string version of the signature of your function above the duo call
then pass the signature in as a parameter to duo()

EXAMPLE
// this can be minified
function yourFunction(a,b,c){
	var sig = "a,b,c";
	var d; if (d = duo(yourFunction, arguments, sig)) return d;
    console.log(a,b,c);
};
yourFunction(1,null,3); // traditional parameters in order
yourFunction({a:1,c:3}); // configuration object with duo
END EXAMPLE

NOTE: if you are running the function as a constructor with the new keyword
then you need to pass in this (keyword) as the last parameter (sig can be null)
this allows duo() to test to see if we need to rerun the function as a constructor

EXAMPLE
function YourClass(a,b,c){
    var sig = "a,b,c";
    // pass this (the object scope) as the last parameter
    var d; if (d = duo(YourClass, arguments, sig, this)) return d;
    console.log(a,b,c);
};
new YourClass(1,undefined,3); // traditional parameters in order
new YourClass({a:1,c:3}); // configuration object with duo
END EXAMPLE

PARAMETERS
func - reference to the function you want to use params or a config object with
args - reference to the arguments property of the function (literally, use "arguments" with no quotes)
sig - (default null) a string listing of the parameters just how they are in the () not including the ()
	required if you are minifying the file as minifying changes the signature
scope - (default null) reference to this (litterally, use "this" without the quotes)
	required if the function is being run with the new keyword

RETURNS a Boolean
*/
function isDuo(a) {return a.length == 1 && a[0] != undefined && a[0].constructor === {}.constructor;}
function duo(func, args, sig, scope) {
    if (isDuo(args)) {
        var zp = args[0];
        var za = (sig==null)?func.toString().split(/\n/,1)[0].match(/\((.*)\)/)[1].replace(/\s+/g,"").split(","):sig.replace(/\s+/g,"").split(",");
        var zv = []; var zi; var zt;
        for (zi=0; zi<za.length; zi++) {zt=za[zi].split("=")[0]; za[zi]=zt; zv.push(zp[zt]);}
        for (zi in zp) {if (za.indexOf(zi)<0) {if (zon) zog(func,"bad argument "+zi);}};
        var zr; if (zr=(func.prototype.isPrototypeOf(scope))?new (func.bind.apply(func,[null].concat(zv)))():func.apply(null,zv)) {return zr;} else {return true;}
    }
}