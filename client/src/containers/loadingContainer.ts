import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import LoadingComponent from '../components/Utils/Loading';

import { LoadingActionTypes, startLoading, stopLoading } from '../actions/loading';

const mapStateToProps = (state: IState) => ({
  isLoading: state.loading.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<LoadingActionTypes>) => ({
  startLoading: () => dispatch(startLoading()),
  stopLoading: () => dispatch(stopLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingComponent);
