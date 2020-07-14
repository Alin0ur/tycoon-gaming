$(document).ready(function () {
    $('#BTN_calculate').click(function () {
        var capacity = parseInt($('#trailer').val());
        var premium = $('#premium').val();
        var inventory = $('#inventory').val();

        if (premium === 'ok') capacity = Math.round(capacity * 1.15);
        if (inventory === 'ok') capacity += 300;

        // CONCRETE
        var amountConcrete = $('#concrete').val();
        var weightConcrete = 160;
        var costConcrete = amountConcrete * 15000;

        // CEMENT
        var amountCement = amountConcrete * 5;
        var weightCement = 25;
        var costCement = amountCement * 1500;

        // TREATED WATER
        var amountTreatedWater = amountConcrete;
        var weightTreatedWater = 100;

        // UNFILTERED WATER
        var amountUnfilteredWater = amountConcrete;
        var weightUnfilteredWater = 110;
        var costUnfilteredWater = amountUnfilteredWater * 5000;

        // ACID
        var amountAcid = amountConcrete;
        var weightAcid = 5;
        var costAcid = amountAcid * 15000;

        // TOXIC WASTE
        var amountToxicWaste = Math.ceil(amountConcrete / 4);
        var weightToxicWaste = 110;

        // RUBBLE
        var amountRubble = Math.ceil(amountConcrete * 25 / 6 * 10 / 12);
        var weightRubble = 150;
        var costRubble = amountRubble * 15000;

        // SAND
        var amountSand = Math.ceil(amountConcrete * 25);
        var weightSand = 5;

        // SAWDUST
        var amountSawdust = Math.ceil(amountConcrete * 10);
        var weightSawdust = 3;
        var costSawdust = amountSawdust * 500;

        // LOGS
        var amountLogs = amountSawdust / 10;
        var weightLogs = 60;
        var costLogs = amountLogs * 7500;

        /**********/

        // ACID per run
        var perRunToxicWaste = Math.floor(capacity / weightToxicWaste);
        var perRunAcidTW = perRunToxicWaste * 4;

        // TREATED WATER per run
        var perRunUnfilteredWater = Math.floor(capacity * 0.96 / weightUnfilteredWater);
        var perRunAcid = perRunUnfilteredWater;
        var perRunTreatedWater = perRunUnfilteredWater;

        // SAWDUST per run
        var perRunLogs = Math.floor(capacity / weightLogs);
        var perRunSawdust = Math.floor(perRunLogs * 10);

        // SAND per run
        var perRunRubble = Math.floor(capacity / weightRubble);
        var perRunGravel = Math.floor(perRunRubble * 12);
        var perRunSandGravel = Math.floor(perRunGravel * 0.6);

        // CEMENT per run
        var perRunSand = Math.floor(capacity * 0.8 / weightSand);
        var perRunSawdust = Math.ceil(perRunSand / 2.5);
        var perRunCement = Math.ceil(perRunSand / 5);

        /**********/

        var processing = costConcrete + costCement + costUnfilteredWater + costAcid + costRubble + costSawdust + costLogs;
        var total = amountConcrete * 800000;
        var profit = numeral(total - processing).format('($ 0.00 a)');

        var processingNum = numeral(processing).format('($ 0.00 a)');
        var totalNum = numeral(total).format('($ 0.00 a)');
        var profitNum = numeral(profit).format('($ 0.00 a)');

        var output = '';

        output +=
            '<h4>General information</h4>' +
            '<table class="table table-hover">' +
            '   <thead>' +
            '       <tr class="table-active">' +
            '           <th>Capacity</th>' +
            '           <th>Concrete</th>' +
            '           <th>Processing</th>' +
            '           <th>Profit</th>' +
            '           <th>Total</th>' +
            '       </tr>' +
            '   </thead>' +
            '   <tr>' +
            '       <td>' + capacity + '</td>' +
            '       <td>' + amountConcrete + '</td>' +
            '       <td>' + processingNum + '</td>' +
            '       <td>' + profitNum + '</td>' +
            '       <td>' + totalNum + '</td>' +
            '   </tr>' +
            '</table><hr>';

        // TABLE: ACID
        output += '<h4>Acid</h4>' +
            '<table class="table table-responsive table-hover">' +
            '   <thead>' +
            '       <tr class="table-active">' +
            '           <th>Product</th>' +
            '           <th>Amount</th>' +
            '           <th>Max per run</th>' +
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '       <tr>' +
            '           <td>Toxic Waste</td>' +
            '           <td>' + amountToxicWaste + '</td>' +
            '           <td>' + perRunToxicWaste + '</td>' +
            '       </tr>' +
            '       <tr>' +
            '           <th>Acid</th>' +
            '           <th>' + amountAcid + '</th>' +
            '           <th>' + perRunAcidTW + '</th>' +
            '       </tr>' +
            '   </tbody>' +
            '</table><hr>';

        // TABLE: TREATED WATER
        output += '<h4>Treated Water</h4>' +
            '<table class="table table-responsive table-hover">' +
            '   <thead>' +
            '       <tr class="table-active">' +
            '           <th>Product</th>' +
            '           <th>Amount</th>' +
            '           <th>Max per run</th>' +
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '       <tr>' +
            '           <td>Acid</td>' +
            '           <td>' + amountAcid + '</td>' +
            '           <td>' + perRunAcid + '</td>' +
            '       </tr>' +
            '       <tr>' +
            '           <td>Unfiltered Water</td>' +
            '           <td>' + amountUnfilteredWater + '</td>' +
            '           <td>' + perRunUnfilteredWater + '</td>' +
            '       </tr>' +
            '       <tr>' +
            '           <th>Treated Water</th>' +
            '           <th>' + amountTreatedWater + '</th>' +
            '           <th>' + perRunTreatedWater + '</th>' +
            '       </tr>' +
            '   </tbody>' +
            '</table><hr>';

        // TABLE: SAWDUST
        output += '<h4>Sawdust</h4>' +
            '<table class="table table-responsive table-hover">' +
            '   <thead>' +
            '       <tr class="table-active">' +
            '           <th>Product</th>' +
            '           <th>Amount</th>' +
            '           <th>Max per run</th>' +
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '       <tr>' +
            '           <td>Logs</td>' +
            '           <td>' + amountLogs + '</td>' +
            '           <td>' + perRunLogs + '</td>' +
            '       </tr>' +
            '       <tr>' +
            '           <th>Sawdust</th>' +
            '           <th>' + amountSawdust + '</th>' +
            '           <th>' + perRunSawdust + '</th>' +
            '       </tr>' +
            '   </tbody>' +
            '</table><hr>';

        // TABLE: SAND
        output += '<h4>Sand</h4>' +
            '<table class="table table-responsive table-hover">' +
            '   <thead>' +
            '       <tr class="table-active">' +
            '           <th>Product</th>' +
            '           <th>Amount</th>' +
            '           <th>Max per run</th>' +
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '       <tr>' +
            '           <td>Quarry Rubble</td>' +
            '           <td>' + amountRubble + '</td>' +
            '           <td>' + perRunRubble + '</td>' +
            '       </tr>' +
            '       <tr>' +
            '           <td>Gravel</td>' +
            '           <td>' + amountSawdust + '</td>' +
            '           <td>' + perRunGravel + '</td>' +
            '       </tr>' +
            '       <tr>' +
            '           <th>Sand</th>' +
            '           <th>' + amountSand + '</th>' +
            '           <th>' + perRunSandGravel + '</th>' +
            '       </tr>' +
            '   </tbody>' +
            '</table><hr>';

        // TABLE: CEMENT
        output += '<h4>Cement</h4>' +
            '<table class="table table-responsive table-hover">' +
            '   <thead>' +
            '       <tr class="table-active">' +
            '           <th>Product</th>' +
            '           <th>Amount</th>' +
            '           <th>Max per run</th>' +
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '       <tr>' +
            '           <td>Sand</td>' +
            '           <td>' + amountSand + '</td>' +
            '           <td>' + perRunSand + '</td>' +
            '       </tr>' +
            '       <tr>' +
            '           <td>Sawdust</td>' +
            '           <td>' + amountSawdust + '</td>' +
            '           <td>' + perRunSawdust + '</td>' +
            '       </tr>' +
            '       <tr>' +
            '           <th>Cement</th>' +
            '           <th>' + amountCement + '</th>' +
            '           <th>' + perRunCement + '</th>' +
            '       </tr>' +
            '   </tbody>' +
            '</table><hr>';

        $('#output').html(output);
    })
});