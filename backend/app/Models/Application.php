<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    public const STATUSES = ['applied', 'interview', 'offer', 'rejected'];

    protected $fillable = [
        'user_id',
        'company_id',
        'position',
        'status',
        'applied_date',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'applied_date' => 'date',
        ];
    }

    // An application belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // An application belongs to one company
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
