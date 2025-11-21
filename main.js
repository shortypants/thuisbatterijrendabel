
function calculateProfitability() {
    // Get input values
    const batteryCost = parseFloat(document.getElementById('batteryCost').value);
    const batteryCapacity = parseFloat(document.getElementById('batteryCapacity').value);
    const dailyUsage = parseFloat(document.getElementById('dailyUsage').value);
    const rateWithout = parseFloat(document.getElementById('rateWithout').value);
    const rateWith = parseFloat(document.getElementById('rateWith').value);
    const lifespan = parseFloat(document.getElementById('lifespan').value);
    const maintenance = parseFloat(document.getElementById('maintenance').value) || 0;

    // Calculate annual savings
    // Assume battery is used to offset daily usage up to its capacity
    const dailySavings = Math.min(batteryCapacity, dailyUsage) * (rateWithout - rateWith);
    const annualSavings = dailySavings * 365;

    // Total maintenance over lifespan
    const totalMaintenance = maintenance * lifespan;

    // Payback period
    const paybackPeriod = annualSavings > 0 ? (batteryCost + totalMaintenance) / annualSavings : Infinity;

    // Profitability verdict
    let verdict = '';
    if (paybackPeriod <= lifespan) {
        verdict = `<span style="color:green;font-weight:bold;">Profitable</span> (Payback in ${paybackPeriod.toFixed(1)} years)`;
    } else if (annualSavings > 0) {
        verdict = `<span style="color:orange;font-weight:bold;">Not profitable within battery lifespan</span> (Payback in ${paybackPeriod.toFixed(1)} years)`;
    } else {
        verdict = `<span style="color:red;font-weight:bold;">Not profitable</span> (No savings)`;
    }

    // Show result
    document.getElementById('result').innerHTML = `
        <strong>Estimated Annual Savings:</strong> $${annualSavings.toFixed(2)}<br>
        <strong>Payback Period:</strong> ${paybackPeriod === Infinity ? 'Never' : paybackPeriod.toFixed(1) + ' years'}<br>
        <strong>Profitability:</strong> ${verdict}
    `;
}
