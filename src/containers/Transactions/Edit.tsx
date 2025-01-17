import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import Layout from '../../components/Transactions/Edit';
import { RootDispatch, RootState } from '../../store';
import { ContainerPropType } from '../types';

const Edit: FC = ({ navigation, route }: ContainerPropType) => {
  const { loading } = useSelector((state: RootState) => state.loading.models.transactions);
  const accounts = useSelector((state: RootState) => state.accounts.autocompleteAccounts);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const budgets = useSelector((state: RootState) => state.budgets.budgets);
  const descriptions = useSelector((state: RootState) => state.accounts.autocompleteDescriptions);
  const { loading: loadingAutocomplete } = useSelector((state: RootState) => state.loading.models.accounts);
  const dispatch = useDispatch<RootDispatch>();

  const { payload } = route.params;

  const onEdit = async (transaction) => {
    const { id } = route.params;

    await dispatch.transactions.updateTransactions({ id, transaction });
  };

  const fetchTransactions = async () => {
    try {
      await dispatch.transactions.getTransactions();
    } catch (e) {
      // catch 401
    }
  };

  const goToTransactions = async () => {
    await fetchTransactions();
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Transactions',
      }),
    );
  };

  return (
    <Layout
      navigation={navigation}
      loading={loading}
      loadingAutocomplete={loadingAutocomplete}
      payload={payload}
      accounts={accounts}
      categories={categories}
      budgets={budgets}
      descriptions={descriptions}
      goToTransactions={goToTransactions}
      getAutocompleteAccounts={dispatch.accounts.getAutocompleteAccounts}
      getAutocompleteDescription={dispatch.accounts.getAutocompleteDescriptions}
      getAutocompleteCategories={dispatch.categories.getAutocompleteCategories}
      getAutocompleteBudgets={dispatch.budgets.getAutocompleteBudgets}
      onEdit={onEdit}
    />
  );
};

export default Edit;
