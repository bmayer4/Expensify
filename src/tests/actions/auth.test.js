import { login, logout } from '../../actions/auth';

test('should generate login action object', () => {
    const action = login('123abc');
    expect(action).toEqual({type: 'LOGIN', uid: '123abc'});
});

test('should geneate logout action object', () => {
    const action = logout();
    expect(action).toEqual({type: 'LOGOUT'});
});


//****  we didn't do other action tests.... */