import test from 'node:test';
import assert from 'node:assert/strict';
import { initialLanguage } from '../src/utils/language.js';
test('shareable locale wins over stored preference when visiting the official portfolio',()=>{
 assert.equal(initialLanguage('?lang=en','pt'),'en');
 assert.equal(initialLanguage('?lang=pt','en'),'pt');
 assert.equal(initialLanguage('?lang=invalid','en'),'en');
 assert.equal(initialLanguage('',null),'pt');
});
