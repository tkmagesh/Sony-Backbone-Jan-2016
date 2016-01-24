var products = [
    {id : 3, name : "Pen", cost : 20, units : 20, category : 1},
    {id : 7, name : "Hen", cost : 100, units : 10, category : 2},
    {id : 5, name : "Den", cost : 200, units : 30, category : 1},
    {id : 4, name : "Ten", cost : 10, units : 10, category : 2},
    {id : 6, name : "Zen", cost : 1000, units : 1, category : 1}
];

/*
1. Sort
2. Filter
3. Any
4. All
5. Min
6. Max
7. CountBy
8. Sum
9. Aggregate
10. GroupBy
11. Transform
*/

function describe(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}



describe("Default list", function(){
    console.table(products);
});


describe("Sort", function(){
    describe("Default [products by id]", function(){
        function sort(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++ )
                    if (products[i].id > products[j].id){
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }
        }
        sort();
        console.table(products);
    });
    describe("Any collection by any attribute", function(){
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++ )
                    if (list[i][attrName] > list[j][attrName]){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
            }
        }
        describe("Products by cost", function(){
            sort(products, "cost");
            console.table(products);
        });
        describe("Products by units", function(){
            sort(products, "units");
            console.table(products);
        });
    });
    describe("Any colletion by any comparer", function(){
        function sort(list, comparer){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++ )
                    if (comparer(list[i], list[j]) > 0 ){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
            }
        }
        describe("Products by value [ cost * units ]", function(){
            var productValueComparer = function(p1, p2){
                var p1Value = p1.units * p1.cost,
                    p2Value = p2.units * p2.cost;
                if (p1Value < p2Value) return -1;
                if (p1Value === p2Value) return 0;
                return 1;
            }
            sort(products, productValueComparer);
            console.table(products);
        });
    })
});

describe("Filter", function(){
    describe("All costly products [cost > 100]", function(){
        function filterCostlyProducts(){
            var result = [];
            for(var i=0; i<products.length; i++)
                if (products[i].cost > 100)
                    result.push(products[i]);
            return result;
        }
        var costlyProducts = filterCostlyProducts();
        console.table(costlyProducts);
    });
    describe("Any list by any criteria", function(){
        function filter(list, criteriaFn){
            var result = [];
            for(var i=0; i<list.length; i++)
                if (criteriaFn(list[i]))
                    result.push(list[i]);
            return result;
        }
        var category1ProductCriteria = function(product){
            return product.category === 1;
        };
        describe("Products in Category 1", function(){

            var category1Products = filter(products, category1ProductCriteria);
            console.table(category1Products);
        });
        var costlyProductCriteria = function(product){
            return product.cost > 100;
        }
        describe("All costly products [cost > 100]", function(){

            var costlyProducts = filter(products, costlyProductCriteria);
            console.table(costlyProducts);
        });
        /*var affordableProductCriteria = function(product){
            return !costlyProductCriteria(product);
        }*/
        var negate = function(fn){
            return function(){
                return !fn.apply(this, arguments);
            }
        }
        var affordableProductCriteria = negate(costlyProductCriteria);

        describe("All affordable products [!costlyProduct]", function(){

            var affordableProducts = filter(products, affordableProductCriteria);
            console.table(affordableProducts);
        });
        /*var nonCategory1ProductCriteria = function(product){
            return !category1ProductCriteria(product);
        }*/
        var nonCategory1ProductCriteria = negate(category1ProductCriteria);
        describe("All non category 1 products", function(){
            var nonCategory1Products = filter(products, nonCategory1ProductCriteria);
            console.table(nonCategory1Products);
        })
    });
});

describe("Any", function(){
    function any(list, criteriaFn){
        for(var i=0; i<list.length; i++)
            if (criteriaFn(list[i])) return true;
        return false;
    }
    describe("Are there any costly products ?", function(){
        var hasCostlyProducts = any(products, function(product){
            return product.cost > 100;
        });
        console.log(hasCostlyProducts);
    });
})
describe("All", function(){
    function all(list, criteriaFn){
        for(var i=0; i<list.length; i++)
            if (!criteriaFn(list[i])) return false;
        return true;
    }
    describe("Are all the products costly ?", function(){
        var areAllProductsCostly = all(products, function(product){
            return product.cost > 100;
        });
        console.log(areAllProductsCostly);
    });
})
