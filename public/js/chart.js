// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ]);

    // Set chart options
    var options = {
        'title': 'How Much Pizza I Ate Last Night',
        'width': 400,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'values');
    data.addColumn({ id: 'i0', type: 'number', role: 'interval' });
    data.addColumn({ id: 'i1', type: 'number', role: 'interval' });
    data.addColumn({ id: 'i2', type: 'number', role: 'interval' });
    data.addColumn({ id: 'i2', type: 'number', role: 'interval' });
    data.addColumn({ id: 'i2', type: 'number', role: 'interval' });
    data.addColumn({ id: 'i2', type: 'number', role: 'interval' });

    data.addRows([
        [1, 100, 90, 110, 85, 96, 104, 120],
        [2, 120, 95, 130, 90, 113, 124, 140],
        [3, 130, 105, 140, 100, 117, 133, 139],
        [4, 90, 85, 95, 85, 88, 92, 95],
        [5, 70, 74, 63, 67, 69, 70, 72],
        [6, 30, 39, 22, 21, 28, 34, 40],
        [7, 80, 77, 83, 70, 77, 85, 90],
        [8, 100, 90, 110, 85, 95, 102, 110]
    ]);

    // The intervals data as narrow lines (useful for showing raw source data)
    var options_lines = {
        title: 'Line intervals, default',
        titleColor: 'white',
        fontName: 'aktiv-grotesk',
        fontSize: '18',
        curveType: 'function',
        lineWidth: 4,
        backgroundColor: '#23262C',
        intervals: { 'style': 'line' },
        legend: 'none'
    };

    var chart_lines = new google.visualization.LineChart(document.getElementById('chart_lines'));
    chart_lines.draw(data, options_lines);
}

google.charts.load('current', { 'packages': ['line'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Week');
    data.addColumn('number', 'Chest & Back');
    data.addColumn('number', 'Legs');
    data.addColumn('number', 'Arms');

    data.addRows([
        [1, 37, 80, 41],
        [2, 30, 69, 32],
        [3, 25, 57, 25],
        [4, 11, 18, 43],
        [5, 11, 17, 67],
        [6, 50, 63, 51],
        [7, 60, 12, 9],
        [8, 50, 63, 72],
        [9, 16, 42, 10],
        [10, 44, 63, 51],
        [11, 37, 63, 60],
        [12, 40, 34, 45],
        [13, 35, 60, 35],
        [14, 30, 69, 32]
    ]);

    var options = {
        chart: {
            title: 'Workouts Performed by Body Section in Phase 1',
            subtitle: 'In Repetitions',
            
        },
        backgroundColor: '#23262C',
    };

    var chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, google.charts.Line.convertOptions(options));
}