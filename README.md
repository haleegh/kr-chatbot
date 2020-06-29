# 한국어 버전으로 챗봇 복습하기

- require : module.exports를 return한다. 즉 node에서 require() 함수로 모듈을 가지고 온다.
- concat : string인 문자열과 문자열을 합친다.

### REDUX 정리
1. action: store에 정보를 전달하기 위한 데이터 묶음
ex) const SAVE_MESSAGE = 'save_message'
    const REDUCER = (state, action) => {
      switch (action.type) {
        case SAVE_MESSAGE:
          return {
            ...state,
            message:
          }
      }
    }

2. action creator : JUST 액션을 만들기 위한 함수
ex) function saveMessage(dataToSubmit) {
      return {
        type : SAVE_MESSAGE,
        payload: dataToSubmit
      }
    }

3. reducer: store에 각각 상태변화를 *어떻게 시킬지* 관리해주는 정보가 담김
즉, '변화 -> action 전달 -> 어떻게 store를 교체?'를 관리해줌

4. combineReducers: reducer들을 하나로 합쳐 하나로 관리

5. store: 앱 전체의 상태를 관리하는 저장소
  - createStore : store를 만듦
  - getState : store안의 상태를 가져옴
  - dispatch(action) : store에 있는 reducer들에게 action을 전달 => 각각의 reducer들은 자신에게 맞는 action이 들어오면 store의 상태를 교체