<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory, HasApiTokens;
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'comment_id'; // Specify the new primary key column name
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true; // Set to true if `comment_id` is auto-incrementing

    /**
     * The type of the auto-incrementing ID.
     *
     * @var int
     */
    protected $keyType = 'int'; // Use 'int' if `post_id` is an integer field
    protected $fillable = ['comment_id', 'content', 'post_id', 'user_id', 'like_id', 'parent_id'];
    /**
     * Get the post that owns the comment.
     */
    public function posts(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
    /**
     * Get the user that owns the comment.
     */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    /**
     * Get the parent of comment.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
    /**
     * One comment can have many children comments.
     */
    public function children(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
    /**
     * One comment can have many likes.
     */
    public function likes(): HasMany
    {
        return $this->hasMany(Like::class, 'comment_id');
    }
}
