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


describe("Sorting", function(){
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
