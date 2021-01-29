// import React, { useCallback, useEffect } from 'react';
// import { Modal } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import routes from '../../routes';
// import { RootState } from '../../store/modules';
// import { deleteNoteAsync, getNoteAsync } from '../../store/modules/note';
// import NoteDetail from '../../component/note/NoteDetail';
//
// interface NoteContainerProps {
//   id: number;
// }
//
// const NoteDetailContainer: React.FC<NoteContainerProps> = ({ id }) => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const { note, loading, error } = useSelector(
//     (state: RootState) => state.note
//   );
//
//   const getNote = useCallback(
//     (id: number) => dispatch(getNoteAsync.request(id)),
//     [dispatch]
//   );
//   const deleteNote = useCallback(
//     (id: number) => dispatch(deleteNoteAsync.request(id)),
//     [dispatch]
//   );
//   const onClickUpdateButton = useCallback(
//     (id: number) => () => history.push(routes.note.update(id)),
//     [history]
//   );
//   const onClickDeleteButton = useCallback(
//     (id: number) => () =>
//       Modal.confirm({
//         content: <p>정말 삭제하시겠습니까?</p>,
//         onOk() {
//           deleteNote(id);
//         },
//         okType: 'danger',
//         okText: '삭제',
//         okButtonProps: { disabled: loading.deleteNote },
//         cancelText: '취소',
//         autoFocusButton: 'cancel',
//       }),
//     [deleteNote, loading.deleteNote]
//   );
//
//   useEffect(() => {
//     getNote(id);
//   }, [getNote, id]);
//
//   return (
//     <NoteDetail
//       note={note}
//       onClickUpdateButton={onClickUpdateButton(id)}
//       onClickDeleteButton={onClickDeleteButton(id)}
//       loading={loading.getNote}
//       error={error.getNote}
//     />
//   );
// };
//
// export default NoteDetailContainer;
export {};
