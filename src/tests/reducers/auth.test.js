import authReducer from './../../reducers/auth';

test('should set uid with login', () => {
    const action = { type: 'LOGIN', uid: 'abc123' };
    const state = authReducer({}, action); 
    expect(state).toEqual({ uid: 'abc123' });  
});

test('should remove uid with logout', () => {
    const action = { type: 'LOGOUT' };
    const state = authReducer({ uid: 'anything' }, action); 
    expect(state).toEqual({});  
});
