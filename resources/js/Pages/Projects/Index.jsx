import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Index({ projects }) {
    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Moji Projekti</h1>
                <div className="space-x-2">
                    <InertiaLink
                        href="/projects/create"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                    >
                        Novi Projekt
                    </InertiaLink>
                    <InertiaLink
                        href="/dashboard"
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                    >
                        Dashboard
                    </InertiaLink>
                </div>
            </div>
            <table className="min-w-full bg-white mt-4 border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Naziv</th>
                        <th className="border px-4 py-2">Voditelj</th>
                        <th className="border px-4 py-2">Članovi</th>
                        <th className="border px-4 py-2">Datum početka</th>
                        <th className="border px-4 py-2">Datum završetka</th>
                        <th className="border px-4 py-2">Obavljeni poslovi</th>

                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td className="border px-4 py-2">{project.naziv_projekta}</td>
                            <td className="border px-4 py-2">{project.owner.name}</td>
                            <td className="border px-4 py-2">
                                {project.members.map(m => (
                                    <span key={m.id} className="inline-block bg-gray-200 px-2 py-1 rounded mr-1">{m.name}</span>
                                ))}
                            </td>
                            <td className="border px-4 py-2">{project.datum_pocetka}</td>
                            <td className="border px-4 py-2">{project.datum_zavrsetka}</td>
                            <td className="border px-4 py-2">{project.obavljeni_poslovi}</td>
                            <td className="border px-4 py-2">
                                <InertiaLink
                                    href={`/projects/${project.id}/edit`}
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </InertiaLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
