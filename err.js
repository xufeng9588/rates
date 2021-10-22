process.on('uncaughtException', function(err) {
    console.log(err.stack);
    console.log('NOT exit...');
});