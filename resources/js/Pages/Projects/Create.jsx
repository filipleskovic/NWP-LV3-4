import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Create({ users }) {
    const [form, setForm] = useState({
        naziv_projekta: '',
        opis_projekta: '',
        cijena_projekta: '',
        obavljeni_poslovi: '',
        datum_pocetka: '',
        datum_zavrsetka: '',
        members: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value });
    };

    const toggleMember = (id) => {
        if (form.members.includes(id)) {
            setForm({
                ...form,
                members: form.members.filter(m => m !== id),
            });
        } else {
            setForm({
                ...form,
                members: [...form.members, id],
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post('/projects', form);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Kreiraj Projekt</h1>

            <InertiaLink href="/projects" className="text-blue-500 mb-4 inline-block">← Natrag</InertiaLink>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label>Naziv projekta</label>
                    <input type="text" name="naziv_projekta" value={form.naziv_projekta} onChange={handleChange} className="border p-2 w-full" required />
                </div>
                <div>
                    <label>Opis</label>
                    <textarea name="opis_projekta" value={form.opis_projekta} onChange={handleChange} className="border p-2 w-full" />
                </div>
                <div>
                    <label>Cijena</label>
                    <input type="number" step="0.01" name="cijena_projekta" value={form.cijena_projekta} onChange={handleChange} className="border p-2 w-full" />
                </div>
                <div>
                    <label>Obavljeni poslovi</label>
                    <textarea name="obavljeni_poslovi" value={form.obavljeni_poslovi} onChange={handleChange} className="border p-2 w-full" />
                </div>
                <div>
                    <label>Datum početka</label>
                    <input type="date" name="datum_pocetka" value={form.datum_pocetka} onChange={handleChange} className="border p-2 w-full" />
                </div>
                <div>
                    <label>Datum završetka</label>
                    <input type="date" name="datum_zavrsetka" value={form.datum_zavrsetka} onChange={handleChange} className="border p-2 w-full" />
                </div>

                <div>
                    <label>Članovi tima</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {users.map(u => {
                            const selected = form.members.includes(u.id);
                            return (
                                <div
                                    key={u.id}
                                    onClick={() => toggleMember(u.id)}
                                    className={`cursor-pointer border p-2 rounded ${
                                        selected ? 'bg-blue-500 text-white' : 'bg-white'
                                    }`}
                                >
                                    {u.name} ({u.email})
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Kreiraj</button>
            </form>
        </div>
    );
}
