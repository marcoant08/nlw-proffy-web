import React, { useState, FormEvent } from "react";
import "./styles.css";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

function TeacherList() {
  const [materia, setMateria] = useState("");
  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState([]);

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const r = await api.get("classes", {
      params: {
        week_day,
        materia,
        time,
      },
    });
    console.log(r.data);
    setTeachers(r.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
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
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => {
              setWeek_day(e.target.value);
            }}
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
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <button type="submit">Procurar</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((t: Teacher) => {
          return <TeacherItem key={t.id} teacher={t} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
