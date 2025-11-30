<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $projects = Project::with('owner', 'members')
            ->where('user_id', $user->id)
            ->orWhereHas('members', fn($q) => $q->where('user_id', $user->id))
            ->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        $users = User::orderBy('name')->get();

        return Inertia::render('Projects/Create', [
            'users' => $users
        ]);
    }

    public function show(Project $project)
    {
        $this->authorizeAccess($project);

        return Inertia::render('Projects/Show', [
            'project' => $project->load('owner', 'members')
        ]);
    }

    public function edit(Project $project)
    {
        $this->authorizeAccess($project);

        $user = Auth::user();

        $users = ($project->user_id === $user->id) ? User::orderBy('name')->get() : collect();

        return Inertia::render('Projects/Edit', [
            'project' => $project->load('members'),
            'users' => $users,
            'currentUser' => Auth::user(), 
    ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'naziv_projekta' => 'required|string|max:255',
            'opis_projekta' => 'nullable|string',
            'cijena_projekta' => 'nullable|numeric',
            'obavljeni_poslovi' => 'nullable|string',
            'datum_pocetka' => 'nullable|date',
            'datum_zavrsetka' => 'nullable|date|after_or_equal:datum_pocetka',
            'members' => 'nullable|array',
            'members.*' => 'exists:users,id',
        ]);

        $project = Project::create([
            'naziv_projekta' => $validated['naziv_projekta'],
            'opis_projekta' => $validated['opis_projekta'] ?? null,
            'cijena_projekta' => $validated['cijena_projekta'] ?? null,
            'obavljeni_poslovi' => $validated['obavljeni_poslovi'] ?? null,
            'datum_pocetka' => $validated['datum_pocetka'] ?? null,
            'datum_zavrsetka' => $validated['datum_zavrsetka'] ?? null,
            'user_id' => Auth::id(),
        ]);

        if (!empty($validated['members'])) {
            $project->members()->sync($validated['members']);
        }

        return redirect()->route('projects.index')->with('success', 'Projekt kreiran.');
    }

    public function update(Request $request, Project $project)
    {
        $user = Auth::user();

        if ($project->user_id === $user->id) {
            $validated = $request->validate([
                'naziv_projekta' => 'required|string|max:255',
                'opis_projekta' => 'nullable|string',
                'cijena_projekta' => 'nullable|numeric',
                'obavljeni_poslovi' => 'nullable|string',
                'datum_pocetka' => 'nullable|date',
                'datum_zavrsetka' => 'nullable|date|after_or_equal:datum_pocetka',
                'members' => 'nullable|array',
                'members.*' => 'exists:users,id',
            ]);

            $project->update($validated);

            if (isset($validated['members'])) {
                $project->members()->sync($validated['members']);
            }

        } elseif ($project->members->contains($user->id)) {
            $validated = $request->validate([
                'obavljeni_poslovi' => 'nullable|string',
            ]);

            $project->update(['obavljeni_poslovi' => $validated['obavljeni_poslovi']]);

        } else {
            abort(403, 'Nemate pravo uređivati ovaj projekt.');
        }

        return redirect()->route('projects.index')->with('success', 'Projekt ažuriran.');
    }

    protected function authorizeAccess(Project $project)
    {
        $userId = Auth::id();
        if ($project->user_id === $userId) return;
        if ($project->members()->where('user_id', $userId)->exists()) return;

        abort(403, 'Nemate pristup ovom projektu.');
    }
}
