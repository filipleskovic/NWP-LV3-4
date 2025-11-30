<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'naziv_projekta' => 'required|string|max:255',
            'opis_projekta' => 'nullable|string',
            'cijena_projekta' => 'nullable|numeric|min:0',
            'obavljeni_poslovi' => 'nullable|string',
            'datum_pocetka' => 'nullable|date',
            'datum_zavrsetka' => 'nullable|date|after_or_equal:datum_pocetka',
            'members' => 'nullable|array',
            'members.*' => 'exists:users,id',
        ];
    }
}
