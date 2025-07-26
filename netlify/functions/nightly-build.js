exports.handler = async () => {
    const res = await fetch('https://api.netlify.com/build_hooks/68854ce5702b504f60421f87', {
        method: 'POST'
    });
    return {
        statusCode: 200,
        body: 'Triggered build'
    };
};