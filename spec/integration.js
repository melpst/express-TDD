import Jasmine from 'jasmine'

const jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/integration.json');
jasmine.execute();