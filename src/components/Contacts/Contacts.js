import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'redux/phoneBookAPI';
import s from './Contacts.module.css';

const Contacts = () => {
  const { data = [], isFetching } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const filter = useSelector(state => state.filter.filter);

  if (isFetching)
    return (
      <div className={s.loading}>
        <Oval
          height="100"
          width="100"
          color="#2c2020bc"
          secondaryColor="rgb(46, 46, 46)"
          ariaLabel="loading"
        />
      </div>
    );

  return (
    <ul className={s.list}>
      {[...data]
        .reverse()
        .filter(el => el.name.toLowerCase().includes(filter))
        .map(({ id, number, name }) => (
          <li className={s.item} key={id}>
            {name}: {number}
            <button
              className={s.deleteBtn}
              type="button"
              onClick={e => deleteContact(id)}
            >
              X
            </button>
          </li>
        ))}
      {isFetching && (
        <li>
          <Oval
            height="20"
            width="20"
            color="#2c2020bc"
            secondaryColor="rgb(46, 46, 46)"
            ariaLabel="loading"
          />
        </li>
      )}
    </ul>
  );
};

export default Contacts;
