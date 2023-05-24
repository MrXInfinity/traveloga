const initialState = {
  flightType: '',
  regionsCategory: '',
  travellingFromRegion: '',
  travellingFromLocation: '',
  withHotel: false,
  date: {
    Leave: '',
    Return: '',
  },
  initialAmount: '',
  discount: '',
  amount: '',
};

const bookingReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CHANGE_FLIGHTTYPE':
      return {
        ...state,
        flightType: payload,
        regionsCategory: '',
        travellingFromRegion: '',
        travellingFromLocation: '',
        initialAmount: '',
        amount: '',
      };
    case 'SET_REGION':
      return {
        ...state,
        travellingFromRegion: payload.region,
        regionsCategory: payload.prov,
        travellingFromLocation: '',
        initialAmount: '',
        amount: '',
      };
    case 'SET_LOCATION':
      return {
        ...state,
        travellingFromLocation: payload,
        initialAmount: '',
        amount: '',
      };
    case 'SET_EACHREGION':
      return {
        ...state,
        travellingFromRegion: payload.eachRegion,
        travellingFromLocation: payload.location,
        initialAmount: '',
        amount: '',
      };

    case 'REMOVE_EACHREGION':
      return {
        ...state,
        travellingFromRegion: '',
        travellingFromLocation: '',
        initialAmount: '',
        amount: '',
      };
    case 'HOTEL_TOGGLE':
      return { ...state, withHotel: !state.withHotel, amount: '' };
    case 'LEAVE_BUTTON_CLICK':
      return {
        ...state,
        date: { ...state.date, Leave: payload, Return: '' },
        initialAmount: '',
        amount: '',
      };
    case 'RETURN_BUTTON_CLICK':
      return { ...state, date: { ...state.date, Return: payload } };
    case 'DATE_CLICK':
      return {
        ...state,
        date: { ...state.date, [payload.label]: payload.value },
      };
    case 'DISCOUNT_SET':
      return { ...state, discount: payload, amount: '' };
    case 'DISCOUNT_REMOVE':
      return { ...state, discount: '', amount: '' };
    case 'INITIAL_AMOUNT_SET':
      return { ...state, initialAmount: payload, amount: '' };
    case 'FINAL_AMOUNT_SET':
      return { ...state, amount: payload };
    case 'CLOSE':
      return initialState;
    default:
      return;
  }
};

export { initialState, bookingReducer };
