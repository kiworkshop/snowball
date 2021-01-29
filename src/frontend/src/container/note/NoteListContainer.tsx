// import React, { useCallback, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import routes from '../../routes';
// import { RootState } from '../../store/modules';
// import { getNotesAsync } from '../../store/modules/note';
// import NoteList from '../../component/note/NoteList';
//
// const NoteListContainer = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const { notes } = useSelector((state: RootState) => state.note);
//
//   const getNotesOfUser = useCallback(
//     () => dispatch(getNotesAsync.request({ page: 0, size: 10 })),
//     [dispatch]
//   );
//   const onClickMoreInfoButton = useCallback(
//     (noteId: number) => () => history.push(routes.note.detail(noteId)),
//     [history]
//   );
//
//   useEffect(() => {
//     getNotesOfUser();
//   }, [getNotesOfUser]);
//
//   return (
//     <NoteList notes={notes} onClickMoreInfoButton={onClickMoreInfoButton} />
//   );
// };
//
// export default NoteListContainer;
export {};
