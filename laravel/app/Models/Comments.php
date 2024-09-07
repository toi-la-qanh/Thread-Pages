<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comments extends Model
{
    use HasFactory;
    /**
     * Get the post that owns the comment.
     */
    public function posts(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
        /**
     * Get the post that owns the comment.
     */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
