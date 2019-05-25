function returnMales(data) {

    d3.json("https://rickandmortyapi.com/api/character", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log(data);
        }

        var numPages = data.info.pages - 1;
        console.log(numPages);
        var maleCounter = 0; var femaleCounter = 0; var otherCounter = 0;
        for (var i = 1; i <= numPages; i++) {

            var str = "https://rickandmortyapi.com/api/character/?page=" + i;
            console.log(str);
            d3.json(str, function (error, d) {
                d.results.forEach(function (d) {

                    if (d.gender == 'Male') {
                        maleCounter += maleCounter;
                    } else if (d.gender == 'Female') {
                        femaleCounter += femaleCounter;
                    } else {
                        otherCounter += otherCounter;
                    }

                });

            });

        }

        return maleCounter;

    });

    function getFemales() {
        const sample = [
            {
                'gender': 'male',
                'value': 100
            },
            {
                'gender': 'female',
                'value': 57
            },
            {
                'gender': 'other',
                'value': 14
            }
        ];
            var maleC = 0;
        d3.json(sample, function(d){
            d.results.forEach(function(d){
                if(d.gender == 'male'){
                    maleC++;
                }
            });
        })
        return maleC;

    }

}

console.log("females" + getFemales());
const margin = 60;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;
var males = returnMales();
console.log("males: " + males);
const sample = [
    {
        'gender': 'male',
        'value': 100
    },
    {
        'gender': 'female',
        'value': 57
    },
    {
        'gender': 'other',
        'value': 14
    }
]

const svg = d3.select('svg');

const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);


const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

chart.append('g')
    .call(d3.axisLeft(yScale));

//x scale
const xScale = d3.scaleBand()
    .range([0, width])
    .domain(sample.map((s) => s.gender))
    .padding(0.2)

chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

chart.selectAll()
    .data(sample)
    .enter()
    .append('rect')
    .attr('x', (s) => xScale(s.gender))
    .attr('y', (s) => yScale(s.value))
    .attr('height', (s) => height - yScale(s.value))
    .attr('width', xScale.bandwidth());