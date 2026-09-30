<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'website',
        'notes',
    ];

    // company belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // company has many applications
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}
