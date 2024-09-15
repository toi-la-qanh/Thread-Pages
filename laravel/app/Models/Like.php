<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Like extends Model
{
    use HasFactory, HasApiTokens;
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'like_id'; // Specify the new primary key column name
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true; // Set to true if `post_id` is auto-incrementing

    /**
     * The type of the auto-incrementing ID.
     *
     * @var int
     */
    protected $keyType = 'int'; // Use 'int' if `post_id` is an integer field
    protected $fillable = ['like_id', 'post_id', 'user_id', 'comment_id'];
    /**
     * Get the post that owns the like.
     */
    public function posts(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
    /**
     * Get the post that owns the like.
     */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    /**
     * Get the comment that owns the like.
     */
    public function comments(): BelongsTo
    {
        return $this->belongsTo(Comment::class);
    }
}
