import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import warningIcon from "../../assets/images/icons/warning.svg";
import "./styles.css";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

function TeacherForm() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [custo, setCusto] = useState("");
  const [materia, setMateria] = useState("");
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: "", from: "", to: "" },
  ]);

  function addNewScheduleItem() {}

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        materia,
        custo: Number(custo),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastrado");
        history.push("/");
      })
      .catch(() => {
        alert("Erro");
      });
    console.log(name, avatar, whatsapp, bio, materia, custo, scheduleItems);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const newArray = scheduleItems.map((si, index) => {
      if (index === position) {
        return { ...si, [field]: value };
      }

      return si;
    });

    setScheduleItems(newArray);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a Aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={materia}
              onChange={(e) => {
                setMateria(e.target.value);
              }}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "TI", label: "TI" },
                { value: "Telecom", label: "Telecom" },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={custo}
              onChange={(e) => {
                setCusto(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários Disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((si, index) => {
              return (
                <div key={si.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    //value={si.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
                    options={[
                      { value: "0", label: "Dom" },
                      { value: "1", label: "Seg" },
                      { value: "2", label: "Ter" },
                      { value: "3", label: "Qua" },
                      { value: "4", label: "Qui" },
                      { value: "5", label: "Sex" },
                      { value: "6", label: "Sab" },
                    ]}
                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    //value={si.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    //value={si.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Prencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
