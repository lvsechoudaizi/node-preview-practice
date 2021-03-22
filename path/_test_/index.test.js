test('commonJs', () => {
    const MyModuleClass = new (require('../index'))();
    const { f } = require('../index')

    console.log('f',  require('../index'))
});