<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('naziv_projekta');
            $table->text('opis_projekta')->nullable();
            $table->decimal('cijena_projekta', 12, 2)->nullable();
            $table->text('obavljeni_poslovi')->nullable();
            $table->date('datum_pocetka')->nullable();
            $table->date('datum_zavrsetka')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
