import {
  MODIFICA_ADICIONA_CONTATO_EMAIL,
  ADICIONA_CONTATO_ERRO,
  ADICIONA_CONTATO_SUCESSO,
  LISTA_CONTATO_USUARIO,
  MODIFICA_MENSAGEM,
  LISTA_CONVERSA_USUARIO,
  ENVIA_MENSAGEM_SUCESSO,
  LISTA_CONVERSAS
} from "./types";
import b64 from "base-64";
import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";
import _ from "lodash";

export const modificaAdicionaContatoEmail = texto => {
  return {
    type: MODIFICA_ADICIONA_CONTATO_EMAIL,
    payload: texto
  };
};

export const adicionaContato = email => {
  return dispatch => {
    let email64 = b64.encode(email);
    firebase
      .database()
      .ref(`/contatos/${email64}`)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          const dadosUsuario = _.first(_.values(snapshot.val()));

          let atual64 = b64.encode(firebase.auth().currentUser.email);
          firebase
            .database()
            .ref(`/usuario_contatos/${atual64}`)
            .push({ email, nome: dadosUsuario.nome })
            .then(() => {
              dispatch({
                type: ADICIONA_CONTATO_SUCESSO,
                payload: true
              });
            })
            .catch(erro => {
              dispatch({
                type: ADICIONA_CONTATO_ERRO,
                payload: erro.message
              });
            });
        } else {
          dispatch({
            type: ADICIONA_CONTATO_ERRO,
            payload: email + " não existe"
          });
        }
      })
      .catch(erro => {
        dispatch({
          type: ADICIONA_CONTATO_ERRO,
          payload: erro.message
        });
      });
  };
};

export const habilitaInclusaoContato = () => ({
  type: ADICIONA_CONTATO_SUCESSO,
  payload: false
});

export const contatosUsuarioFetch = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    let email64 = b64.encode(currentUser.email);
    firebase
      .database()
      .ref(`/usuario_contatos/${email64}`)
      .on("value", snapshot => {
        dispatch({
          type: LISTA_CONTATO_USUARIO,
          payload: snapshot.val()
        });
      });
  };
};

export const modificaMensagem = text => {
  return {
    type: MODIFICA_MENSAGEM,
    payload: text
  };
};

export const enviaMensagem = (mensagem, contatoNome, contatoEmail) => {
  return dispatch => {
    const { currentUser } = firebase.auth();
    const usuarioEmail64 = b64.encode(currentUser.email);
    const contatoEmail64 = b64.encode(contatoEmail);

    firebase
      .database()
      .ref(`/mensagens/${usuarioEmail64}/${contatoEmail64}`)
      .push({ mensagem, tipo: "e" })
      .then(() => {
        firebase
          .database()
          .ref(`/mensagens/${contatoEmail64}/${usuarioEmail64}`)
          .push({ mensagem, tipo: "r" })
          .then(() => {
            dispatch({
              type: ENVIA_MENSAGEM_SUCESSO
            });
          });
      })
      .then(() => {
        firebase
          .database()
          .ref(`/usuario_conversas/${usuarioEmail64}/${contatoEmail64}`)
          .set({
            nome: contatoNome,
            email: contatoEmail,
            ultimaMensagem: mensagem,
            tipo: "e"
          });
      })
      .then(() => {
        firebase
          .database()
          .ref(`/contatos/${usuarioEmail64}`)
          .once("value")
          .then(snapshot => {
            let valores = _.first(_.values(snapshot.val()));
            let nome = valores.nome;
            firebase
              .database()
              .ref(`/usuario_conversas/${contatoEmail64}/${usuarioEmail64}`)
              .set({
                nome,
                email: currentUser.email,
                ultimaMensagem: mensagem,
                tipo: "r"
              });
          });
      });
  };
};

export const conversaUsuarioFetch = contatoEmail => {
  const { currentUser } = firebase.auth();
  let usuarioEmail64 = b64.encode(currentUser.email);
  let contatoEmail64 = b64.encode(contatoEmail);

  return dispatch => {
    firebase
      .database()
      .ref(`/mensagens/${usuarioEmail64}/${contatoEmail64}`)
      .on("value", snapshot => {
        dispatch({
          type: LISTA_CONVERSA_USUARIO,
          payload: snapshot.val()
        });
      });
  };
};

export const conversasFetch = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    let email64 = b64.encode(currentUser.email);
    firebase
      .database()
      .ref(`/usuario_conversas/${email64}`)
      .on("value", snapshot => {
        dispatch({
          type: LISTA_CONVERSAS,
          payload: snapshot.val()
        });
      });
  };
};
